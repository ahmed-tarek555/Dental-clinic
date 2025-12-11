from PIL import Image, ImageDraw, ImageFont

# Create a square image (favicon size: 64x64)
size = 64
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))  # transparent background

draw = ImageDraw.Draw(img)

# Draw a crescent moon (simplified)
draw.ellipse((8, 8, 56, 56), fill=(21, 101, 192))   # blue circle
draw.ellipse((20, 8, 56, 56), fill=(255, 255, 255)) # white cutout

# Add initials "AH" in the center
font = ImageFont.truetype("arial.ttf", 12)
draw.text((15, 20), "Al Hilal", fill="red", font=font)

# Save as favicon
img.save("al_hilal_logo.png")
