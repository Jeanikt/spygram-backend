import axios from "axios";
import { config } from "../config/environment";
import { EventEmitter } from "events";

class InstagramService extends EventEmitter {
  private apiBaseUrl: string;
  private accessToken: string;
  private monitoredUsers: Map<string, Set<string>> = new Map();

  constructor() {
    super();
    this.apiBaseUrl = config.instagramApiBaseUrl;
    this.accessToken = config.instagramAccessToken;
    this.startMonitoring();
  }

  async getUserFollowers(username: string): Promise<string[]> {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/users/${username}/followed-by`,
        {
          params: { access_token: this.accessToken },
        }
      );
      return response.data.data.map((user: any) => user.username);
    } catch (error) {
      console.error("Error fetching user followers:", error);
      return [];
    }
  }

  monitorUser(username: string) {
    if (!this.monitoredUsers.has(username)) {
      this.monitoredUsers.set(username, new Set());
      this.updateUserFollowers(username);
    }
  }

  stopMonitoringUser(username: string) {
    this.monitoredUsers.delete(username);
  }

  private async updateUserFollowers(username: string) {
    const currentFollowers = await this.getUserFollowers(username);
    const knownFollowers = this.monitoredUsers.get(username) || new Set();

    const newFollowers = currentFollowers.filter(
      (follower) => !knownFollowers.has(follower)
    );
    const lostFollowers = Array.from(knownFollowers).filter(
      (follower) => !currentFollowers.includes(follower)
    );

    newFollowers.forEach((follower) => {
      this.emit("newFollower", { username, follower });
      knownFollowers.add(follower);
    });

    lostFollowers.forEach((follower) => {
      this.emit("lostFollower", { username, follower });
      knownFollowers.delete(follower);
    });

    this.monitoredUsers.set(username, new Set(currentFollowers));
  }

  private startMonitoring() {
    setInterval(() => {
      this.monitoredUsers.forEach((_, username) => {
        this.updateUserFollowers(username);
      });
    }, 60000); // Check every minute
  }
}

export const instagramService = new InstagramService();