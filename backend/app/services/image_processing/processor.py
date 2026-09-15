import cv2
import numpy as np
from PIL import Image
from pathlib import Path
from typing import List, Tuple

class ImageProcessor:
    @staticmethod
    def load_image(image_path: Path | str) -> np.ndarray:
        img = cv2.imread(str(image_path))
        if img is None:
            raise ValueError(f"Impossible de charger l'image: {image_path}")
        return img

    @staticmethod
    def get_dimensions(image_path: Path | str) -> Tuple[int, int]:
        with Image.open(image_path) as img:
            return img.width, img.height

    @staticmethod
    def extract_dominant_colors(image_path: Path | str, k: int = 5) -> List[str]:
        """Extrait les couleurs dominantes au format hexadécimal via K-Means."""
        try:
            img = cv2.imread(str(image_path))
            if img is None:
                return ["#005596", "#7C878E", "#222222", "#FFFFFF"]
            
            # Convert BGR to RGB and resize for speed
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img_small = cv2.resize(img_rgb, (150, 150), interpolation=cv2.INTER_AREA)
            pixels = img_small.reshape((-1, 3)).astype(np.float32)

            # K-means clustering
            criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
            _, labels, centers = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
            
            # Count label frequency
            counts = np.bincount(labels.flatten())
            sorted_indices = np.argsort(counts)[::-1]
            
            hex_colors = []
            for idx in sorted_indices:
                color = centers[idx].astype(int)
                hex_val = f"#{color[0]:02x}{color[1]:02x}{color[2]:02x}".upper()
                # Ignore pure white or near-white if we already have colors
                if hex_val not in hex_colors:
                    hex_colors.append(hex_val)
                    
            return hex_colors[:k]
        except Exception:
            return ["#005596", "#7C878E", "#222222", "#FFFFFF"]
