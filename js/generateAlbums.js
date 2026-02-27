const fs = require("fs");
const path = require("path");

// Go one level up from /js → project → then into songs/audio
const audioPath = path.join(__dirname, "..", "songs", "audio");

// 🔥 Add custom descriptions here
const customDescriptions = {
    "Best of Hollywood": "Hollywood dance and party hits.",
    "Gaalipata": "Feel-good melodies of love and friendship.",
    "Mungaru Male": "Soulful monsoon romance melodies."
};

const defaultDescription = "Feel the vibe with every track.";

function generateOrUpdateInfoFiles() {

    // Check if audio folder exists
    if (!fs.existsSync(audioPath)) {
        console.error("Audio folder not found at:", audioPath);
        return;
    }

    const folders = fs.readdirSync(audioPath, { withFileTypes: true });

    folders.forEach(folder => {

        if (!folder.isDirectory()) return;

        const folderName = folder.name;
        const folderPath = path.join(audioPath, folderName);
        const infoPath = path.join(folderPath, "info.json");

        const description =
            customDescriptions[folderName] || defaultDescription;

        let data = {
            title: folderName,
            description: description
        };

        // If info.json exists → update it
        if (fs.existsSync(infoPath)) {
            try {
                const existing = JSON.parse(fs.readFileSync(infoPath));
                data = {
                    ...existing,
                    title: folderName,
                    description: description
                };
                console.log(`Updated: ${folderName}`);
            } catch (err) {
                console.log(`Fixed corrupt JSON in: ${folderName}`);
            }
        } else {
            console.log(`Created: ${folderName}`);
        }

        fs.writeFileSync(infoPath, JSON.stringify(data, null, 2));
    });

    console.log("All playlists processed successfully.");
}

generateOrUpdateInfoFiles();


