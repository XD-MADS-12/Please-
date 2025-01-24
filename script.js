const API_KEY = 'AIzaSyCSaVwvthRWkgKfbnr5t7AK8sDv7ia_jm8'; // আপনার YouTube API key
const CHANNEL_ID = 'UCvMfE7iLpU4kFnQ1avkWzcg'; // চ্যানেল ID (shamsul_haque)

const videoContainer = document.getElementById('videoContainer');

// YouTube API ব্যবহার করে চ্যানেলের ভিডিও লোড করা
async function fetchVideos() {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
    );
    const data = await response.json();

    data.items.forEach((item) => {
        if (item.id.kind === "youtube#video") {
            const videoId = item.id.videoId;
            const videoTitle = item.snippet.title;

            // প্রতিটি ভিডিওর জন্য থাম্বনেইল ও প্লে অপশন তৈরি
            const videoElement = document.createElement('div');
            videoElement.innerHTML = `
                <div class="video">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/${videoId}" 
                        title="${videoTitle}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                    <h3>${videoTitle}</h3>
                </div>
            `;
            videoContainer.appendChild(videoElement);
        }
    });
}

fetchVideos();
