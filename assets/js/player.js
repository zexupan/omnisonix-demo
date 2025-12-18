// assets/js/player.js

document.addEventListener('DOMContentLoaded', function() {
    const mainElement = document.querySelector('main');
    const basePath = 'assets/samples';
    // Configuration flag to show/hide spectrograms
    const SHOW_SPECTROGRAMS = true;
    
    // Function to create a section for each category
    function createCategorySection(category) {
        const section = document.createElement('section');
        section.className = 'example';
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
    
    // Function to create a section for each individual example
    function createExampleSection(categoryId, uid) {
        const section = document.createElement('div');
        section.className = 'example-subsection';
        
        // Example header
        const heading = document.createElement('h3');
        heading.textContent = `Sample ${uid}`;
        heading.className = 'example-title';
        
        // Mixture audio player with optional spectrogram
        const mixtureContainer = document.createElement('div');
        mixtureContainer.className = 'audio-container';
        
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
        
        // Add spectrogram if enabled
        if (SHOW_SPECTROGRAMS) {
            const mixtureSpec = document.createElement('img');
            mixtureSpec.src = `${basePath}/${categoryId}/${uid}_mix.png`;
            mixtureSpec.alt = `Spectrogram of input mixture for sample ${uid}`;
            mixtureSpec.className = 'spectrogram';
            mixtureContainer.appendChild(mixtureSpec);
        }
        
        // Extracts grid
        const audioGrid = document.createElement('div');
        audioGrid.className = 'audio-grid';
        
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
        
        // Add spectrogram if enabled
        if (SHOW_SPECTROGRAMS) {
            const gtSpec = document.createElement('img');
            gtSpec.src = `${basePath}/${categoryId}/${uid}_tgt.png`;
            gtSpec.alt = `Spectrogram of ground truth for sample ${uid}`;
            gtSpec.className = 'spectrogram';
            gtContainer.appendChild(gtSpec);
        }
        
        audioGrid.appendChild(gtContainer);
        
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
        
        // Add spectrogram if enabled
        if (SHOW_SPECTROGRAMS) {
            const audiosepSpec = document.createElement('img');
            audiosepSpec.src = `${basePath}/${categoryId}/${uid}_est_audiosep.png`;
            audiosepSpec.alt = `Spectrogram of AudioSep output for sample ${uid}`;
            audiosepSpec.className = 'spectrogram';
            audiosepContainer.appendChild(audiosepSpec);
        }
        
        audioGrid.appendChild(audiosepContainer);
        
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
        
        // Add spectrogram if enabled
        if (SHOW_SPECTROGRAMS) {
            const omnisonixSpec = document.createElement('img');
            omnisonixSpec.src = `${basePath}/${categoryId}/${uid}_est_omnisonix.png`;
            omnisonixSpec.alt = `Spectrogram of OmniSoniX output for sample ${uid}`;
            omnisonixSpec.className = 'spectrogram';
            omnisonixContainer.appendChild(omnisonixSpec);
        }
        
        audioGrid.appendChild(omnisonixContainer);
        
        // Assemble the example section
        section.appendChild(heading);
        section.appendChild(mixtureContainer);
        section.appendChild(audioGrid);
        
        return section;
    }
    
    // Load sample data and create sections
    async function loadSamples() {
        try {
            const response = await fetch('assets/data/samples.json');
            const categories = await response.json();
            
            categories.forEach(category => {
                const section = createCategorySection(category);
                mainElement.appendChild(section);
            });
        } catch (error) {
            console.error('Error loading samples:', error);
            // Fallback content if JSON fails to load
            mainElement.innerHTML = `
                <section class="example">
                    <h2>Error Loading Samples</h2>
                    <p>Unable to load audio samples. Please check the console for more details.</p>
                </section>
            `;
        }
    }
    
    // Initialize
    loadSamples();
});