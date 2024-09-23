import axios from "axios";
import cheerio from "cheerio";

interface FollowerData {
  username: string;
  followers: string;
}

async function scrapeFollowers(username: string): Promise<FollowerData | null> {
  const url = `https://www.instagram.com/${username}/`;

  try {
    const { data, status } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });

    console.log(`Response status: ${status}`);

    // Verifica se o status é 200
    if (status !== 200) {
      console.error(`Failed to fetch data for ${username}: Status ${status}`);
      return null;
    }

    // Verifica se a resposta contém dados
    if (!data) {
      console.error(`No data received for ${username}`);
      return null;
    }

    const $ = cheerio.load(data);

    const followersCount = $('meta[name="description"]')
      .attr("content")
      ?.match(/([0-9,]+) seguidores/);

    if (followersCount) {
      return {
        username,
        followers: followersCount[1].replace(/,/g, ""),
      };
    } else {
      console.error("Followers count not found in the meta description.");
      throw new Error("Followers count not found");
    }
  } catch (error) {
    console.error(`Error scraping followers for ${username}:`, error);
    return null;
  }
}

export default scrapeFollowers;
