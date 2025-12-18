#!/usr/bin/env python3
"""
Generate magnitude spectrograms for all WAV files in a directory and subdirectories
"""

import os
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path
import argparse

def generate_spectrogram(wav_file_path, png_file_path, n_fft=2048, hop_length=512, cmap='magma'):
    """
    Generate magnitude spectrogram for a WAV file and save as PNG without axes
    
    Args:
        wav_file_path (str): Path to the input WAV file
        png_file_path (str): Path where the PNG spectrogram will be saved
        n_fft (int): FFT window size
        hop_length (int): Hop length for STFT
        cmap (str): Colormap for the spectrogram
    """
    try:
        # Load the audio file
        y, sr = librosa.load(wav_file_path, sr=None)
        
        # Compute the Short-Time Fourier Transform (STFT)
        D = librosa.stft(y, n_fft=n_fft, hop_length=hop_length)
        
        # Convert to magnitude spectrogram
        magnitude = np.abs(D)
        
        # # Convert to decibels (log scale)
        # db_magnitude = librosa.amplitude_to_db(magnitude, ref=np.max)
        
        # Create the plot without axes
        fig = plt.figure(figsize=(10, 4))
        ax = fig.add_subplot(111)
        
        # Display spectrogram
        librosa.display.specshow(
            magnitude, 
            sr=sr, 
            hop_length=hop_length,
            cmap=cmap,
            ax=ax
        )
        
        # Remove axes, ticks, and labels
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_xlabel('')
        ax.set_ylabel('')
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_visible(False)
        ax.spines['left'].set_visible(False)
        
        # Remove colorbar for cleaner look
        plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
        
        # Save the figure
        plt.savefig(png_file_path, dpi=150, bbox_inches='tight', pad_inches=0)
        plt.close()
        
        print(f"Generated spectrogram: {png_file_path}")
        
    except Exception as e:
        print(f"Error processing {wav_file_path}: {str(e)}")

def process_directory(root_dir, n_fft=2048, hop_length=512, cmap='magma'):
    """
    Process all WAV files in the root directory and subdirectories to generate spectrograms
    
    Args:
        root_dir (str): Path to the root directory to search for WAV files
        n_fft (int): FFT window size
        hop_length (int): Hop length for STFT
        cmap (str): Colormap for the spectrogram
    """
    root_path = Path(root_dir)
    
    # Check if the directory exists
    if not root_path.exists():
        print(f"Directory {root_dir} does not exist")
        return
    
    # Find all WAV files recursively
    wav_files = list(root_path.rglob("*.wav"))
    
    print(f"Found {len(wav_files)} WAV files in {root_dir} and subdirectories")
    
    # Process each WAV file
    for wav_file in wav_files:
        # Generate corresponding PNG filename
        png_file = wav_file.with_suffix('.png')
        
        # Generate spectrogram
        generate_spectrogram(
            str(wav_file), 
            str(png_file),
            n_fft=n_fft,
            hop_length=hop_length,
            cmap=cmap
        )

def main():
    parser = argparse.ArgumentParser(
        description='Generate magnitude spectrograms for WAV files in a directory and subdirectories',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
        Examples:
        python generate_spectrograms.py --dir ./assets/samples
        python generate_spectrograms.py --dir ./assets/samples --n_fft 4096 --hop_length 1024
        python generate_spectrograms.py --dir ./assets/samples --cmap viridis
            """
        )
        
    parser.add_argument(
        '--dir', 
        default='./samples', 
        help='Path to root directory containing WAV files (default: ./assets/samples)'
    )
    
    parser.add_argument(
        '--n_fft', 
        type=int, 
        default=2048, 
        help='FFT window size (default: 2048)'
    )
    
    parser.add_argument(
        '--hop_length', 
        type=int, 
        default=512, 
        help='Hop length for STFT (default: 512)'
    )
    
    parser.add_argument(
        '--cmap', 
        default='magma', 
        help='Colormap for spectrogram (default: magma)'
    )
    
    args = parser.parse_args()
    
    # Process the directory
    process_directory(
        args.dir,
        n_fft=args.n_fft,
        hop_length=args.hop_length,
        cmap=args.cmap
    )
        
    print("Spectrogram generation completed!")

if __name__ == "__main__":
    main()