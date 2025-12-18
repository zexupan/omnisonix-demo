// assets/js/player.js

document.addEventListener('DOMContentLoaded', function() {
    const mainElement = document.querySelector('main');
    const basePath = 'assets/samples';
    // Disable spectrogram display
    const SHOW_SPECTROGRAMS = false;
    
    // Sample data structure
    const categories = [
        {
            id: "moisesdb",
            title: "Music Stem Extraction",
            description: "Music separation examples from MoisesDB dataset",
            uids: ["3", "39", "42", "121", "130"]
        },
        {
            id: "audiocaps",
            title: "Sound Event Extraction",
            description: "Sound event extraction from AudioCaps dataset",
            uids: ["1026", "1130", "1994"]
        },
        {
            id: "demand",
            title: "Speech Enhancement",
            description: "Speech enhancement examples from DEMAND dataset",
            uids: ["p232_013", "p257_053", "p257_370"]
        },
        {
            id: "speech",
            title: "Speaker Extraction",
            description: "Speaker separation examples",
            uids: ["125", "1014", "1051", "1070", "10045"]
        }
    ];
    
    // Function to create sidebar navigation
    function createSidebar() {
        const sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        
        const nav = document.createElement('nav');
        const navTitle = document.createElement('h3');
        navTitle.textContent = 'Sections';
        nav.appendChild(navTitle);
        
        const navList = document.createElement('ul');
        
        categories.forEach(category => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${category.id}`;
            link.textContent = category.title;
            listItem.appendChild(link);
            navList.appendChild(listItem);
        });
        
        nav.appendChild(navList);
        sidebar.appendChild(nav);
        return sidebar;
    }
    
    // Function to create a section for each category
    function createCategorySection(category) {
        const section = document.createElement('section');
        section.className = 'example';
        section.id = category.id;
        section.setAttribute('aria-labelledby', `${category.id}-heading`);
        
        // Category header
        const heading = document.createElement('h2');
        heading.id = `${category.id}-heading`;
        heading.textContent = category.title;
        
        const description = document.createElement('p');
        description.innerHTML = `<strong>Description:</strong> ${category.description}`;
        
        // Container for all examples in this category
        const examplesContainer = document.createElement('div');
        examplesContainer.className = 'category-examples';
        
        // Create sections for each UID in the category
        category.uids.forEach(uid => {
            const exampleSection = createExampleSection(category.id, uid);
            examplesContainer.appendChild(exampleSection);
        });
        
        // Assemble the category section
        section.appendChild(heading);
        section.appendChild(description);
        section.appendChild(examplesContainer);
        
        return section;
    }
    
    // Function to load and display prompt text
    async function loadPromptText(categoryId, uid) {
        try {
            const response = await fetch(`${basePath}/${categoryId}/${uid}_text.txt`);
            if (response.ok) {
                const text = await response.text();
                return text.trim();
            }
            return "Prompt not available";
        } catch (error) {
            console.error(`Error loading prompt for ${categoryId}/${uid}:`, error);
            return "Prompt not available";
        }
    }
    
    // Function to create a section for each individual example
    function createExampleSection(categoryId, uid) {
        const section = document.createElement('div');
        section.className = 'example-subsection';
        
        // Example header
        const heading = document.createElement('h3');
        heading.textContent = `Sample ${uid}`;
        heading.className = 'example-title';
        
        // Prompt text
        const promptContainer = document.createElement('div');
        promptContainer.className = 'prompt-container';
        const promptLabel = document.createElement('strong');
        promptLabel.textContent = 'Prompt: ';
        const promptText = document.createElement('span');
        promptText.className = 'prompt-text';
        promptText.textContent = 'Loading...';
        
        promptContainer.appendChild(promptLabel);
        promptContainer.appendChild(promptText);
        
        // Load prompt text asynchronously
        loadPromptText(categoryId, uid).then(text => {
            promptText.textContent = text;
        });
        
        // Audio comparison row
        const audioComparison = document.createElement('div');
        audioComparison.className = 'audio-comparison';
        
        // Input mixture
        const mixtureContainer = document.createElement('div');
        mixtureContainer.className = 'audio-item';
        const mixtureHeading = document.createElement('h4');
        mixtureHeading.textContent = 'Input Mixture';
        mixtureHeading.className = 'audio-label';
        const mixtureAudio = document.createElement('audio');
        mixtureAudio.controls = true;
        mixtureAudio.preload = 'none';
        mixtureAudio.className = 'audio-player';
        const mixtureSource = document.createElement('source');
        mixtureSource.src = `${basePath}/${categoryId}/${uid}_mix.wav`;
        mixtureSource.type = 'audio/wav';
        mixtureAudio.appendChild(mixtureSource);
        mixtureAudio.appendChild(document.createTextNode('Your browser does not support the audio element.'));
        mixtureContainer.appendChild(mixtureHeading);
        mixtureContainer.appendChild(mixtureAudio);
        
        // Ground truth
        const gtContainer = document.createElement('div');
        gtContainer.className = 'audio-item';
        const gtHeading = document.createElement('h4');
        gtHeading.textContent = 'Ground Truth';
        gtHeading.className = 'audio-label';
        const gtAudio = document.createElement('audio');
        gtAudio.controls = true;
        gtAudio.preload = 'none';
        gtAudio.className = 'audio-player';
        const gtSource = document.createElement('source');
        gtSource.src = `${basePath}/${categoryId}/${uid}_tgt.wav`;
        gtSource.type = 'audio/wav';
        gtAudio.appendChild(gtSource);
        gtAudio.appendChild(document.createTextNode('Your browser does not support the audio element.'));
        gtContainer.appendChild(gtHeading);
        gtContainer.appendChild(gtAudio);
        
        // AudioSep output
        const audiosepContainer = document.createElement('div');
        audiosepContainer.className = 'audio-item';
        const audiosepHeading = document.createElement('h4');
        audiosepHeading.textContent = 'AudioSep Output';
        audiosepHeading.className = 'audio-label';
        const audiosepAudio = document.createElement('audio');
        audiosepAudio.controls = true;
        audiosepAudio.preload = 'none';
        audiosepAudio.className = 'audio-player';
        const audiosepSource = document.createElement('source');
        audiosepSource.src = `${basePath}/${categoryId}/${uid}_est_audiosep.wav`;
        audiosepSource.type = 'audio/wav';
        audiosepAudio.appendChild(audiosepSource);
        audiosepAudio.appendChild(document.createTextNode('Your browser does not support the audio element.'));
        audiosepContainer.appendChild(audiosepHeading);
        audiosepContainer.appendChild(audiosepAudio);
        
        // OmniSoniX output
        const omnisonixContainer = document.createElement('div');
        omnisonixContainer.className = 'audio-item';
        const omnisonixHeading = document.createElement('h4');
        omnisonixHeading.textContent = 'OmniSoniX Output';
        omnisonixHeading.className = 'audio-label';
        const omnisonixAudio = document.createElement('audio');
        omnisonixAudio.controls = true;
        omnisonixAudio.preload = 'none';
        omnisonixAudio.className = 'audio-player';
        const omnisonixSource = document.createElement('source');
        omnisonixSource.src = `${basePath}/${categoryId}/${uid}_est_omnisonix.wav`;
        omnisonixSource.type = 'audio/wav';
        omnisonixAudio.appendChild(omnisonixSource);
        omnisonixAudio.appendChild(document.createTextNode('Your browser does not support the audio element.'));
        omnisonixContainer.appendChild(omnisonixHeading);
        omnisonixContainer.appendChild(omnisonixAudio);
        
        // Add all audio items to the comparison row
        audioComparison.appendChild(mixtureContainer);
        audioComparison.appendChild(gtContainer);
        audioComparison.appendChild(audiosepContainer);
        audioComparison.appendChild(omnisonixContainer);
        
        // Assemble the example section
        section.appendChild(heading);
        section.appendChild(promptContainer);
        section.appendChild(audioComparison);
        
        return section;
    }
    
    // Create sidebar and main content
    const sidebar = createSidebar();
    document.body.insertBefore(sidebar, mainElement);
    
    // Create sections for each category
    categories.forEach(category => {
        const section = createCategorySection(category);
        mainElement.appendChild(section);
    });
});
