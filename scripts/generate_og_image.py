import math
from PIL import Image, ImageDraw, ImageFont

# 1200 x 630 standard Open Graph resolution
WIDTH = 1200
HEIGHT = 630

image = Image.new("RGBA", (WIDTH, HEIGHT), (12, 10, 14, 255))
draw = ImageDraw.Draw(image)

# Background radial ambient glows
# Top-right Sakura Pink glow
for r in range(400, 0, -5):
    alpha = int(45 * (1 - r / 400))
    draw.ellipse([900 - r, 120 - r, 900 + r, 120 + r], fill=(244, 114, 182, alpha))

# Bottom-left Rose Quartz glow
for r in range(350, 0, -5):
    alpha = int(35 * (1 - r / 350))
    draw.ellipse([250 - r, 500 - r, 250 + r, 500 + r], fill=(251, 113, 133, alpha))

# Draw Grid Dots pattern in background
dot_color = (255, 255, 255, 12)
for x in range(40, WIDTH, 40):
    for y in range(40, HEIGHT, 40):
        draw.ellipse([x - 1.5, y - 1.5, x + 1.5, y + 1.5], fill=dot_color)

# Central Glassmorphism Card (1060 x 510)
card_x0, card_y0 = 70, 60
card_x1, card_y1 = 1130, 570
card_radius = 24

# Outer card glow border
draw.rounded_rectangle([card_x0 - 2, card_y0 - 2, card_x1 + 2, card_y1 + 2], radius=card_radius + 2, outline=(244, 114, 182, 45), width=2)
# Card body
draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=card_radius, fill=(21, 17, 26, 235), outline=(255, 255, 255, 30), width=1)

# Subtle top highlight inside card
draw.line([card_x0 + 40, card_y0 + 1, card_x1 - 40, card_y0 + 1], fill=(244, 114, 182, 80), width=1)

# Try loading system fonts (Segoe UI, Arial, or default)
def get_font(size, bold=False):
    font_names = [
        "seguiui.ttf" if not bold else "seguisb.ttf",
        "segoeui.ttf" if not bold else "segoeuib.ttf",
        "arial.ttf" if not bold else "arialbd.ttf"
    ]
    for fn in font_names:
        try:
            return ImageFont.truetype(fn, size)
        except Exception:
            pass
    return ImageFont.load_default()

font_brand = get_font(76, bold=True)
font_version = get_font(22, bold=True)
font_title = get_font(42, bold=True)
font_sub = get_font(24, bold=False)
font_pill = get_font(20, bold=True)
font_url = get_font(22, bold=False)

# 1. Brand Logo Box (84 x 84)
logo_x, logo_y = 130, 120
logo_size = 80
draw.rounded_rectangle([logo_x, logo_y, logo_x + logo_size, logo_y + logo_size], radius=18, fill=(244, 114, 182, 255))
# "L" in Logo box
font_logo_letter = get_font(52, bold=True)
draw.text((logo_x + 24, logo_y + 8), "L", fill=(255, 255, 255, 255), font=font_logo_letter)

# Brand Text "leliUI"
draw.text((logo_x + 105, logo_y - 4), "leliUI", fill=(255, 255, 255, 255), font=font_brand)

# Version Pill Badge [v1.0.21]
ver_text = "v1.0.21 • Official Release"
ver_w = 260
draw.rounded_rectangle([logo_x + 360, logo_y + 22, logo_x + 360 + ver_w, logo_y + 58], radius=18, fill=(244, 114, 182, 35), outline=(244, 114, 182, 90), width=1)
draw.text((logo_x + 378, logo_y + 28), ver_text, fill=(244, 114, 182, 255), font=font_version)

# 2. Main Headline
headline = "Zero-Dependency Modern UI Library"
draw.text((130, 235), headline, fill=(245, 243, 247, 255), font=font_title)

# 3. Subheadline
subheadline = "Sakura Pink Aesthetics & Dark Mode • Designed for Humans & AI Coding Agents"
draw.text((130, 295), subheadline, fill=(161, 155, 168, 255), font=font_sub)

# 4. Feature Pills Grid
pills = [
    "🌸 Sakura & Plum Tokens",
    "⚡ 20 Clean Components",
    "🔍 Spotlight Palette (⌘K)",
    "💻 Live Syntax Sandbox",
    "🤖 Native /llms.txt Hub"
]

pill_x = 130
pill_y = 365
for pill in pills:
    pill_w = len(pill) * 11 + 24
    draw.rounded_rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + 44], radius=12, fill=(255, 255, 255, 12), outline=(255, 255, 255, 28), width=1)
    draw.text((pill_x + 14, pill_y + 10), pill, fill=(244, 240, 247, 255), font=font_pill)
    pill_x += pill_w + 14

# 5. Bottom Status / URL bar
draw.line([130, 470, 1070, 470], fill=(255, 255, 255, 20), width=1)

url_text = "https://heqate.github.io/LeliUI/"
draw.text((130, 492), url_text, fill=(244, 114, 182, 255), font=font_url)

author_text = "Crafted with Modern CSS @layer & @container"
draw.text((680, 492), author_text, fill=(161, 155, 168, 255), font=font_url)

# Save image
output_path = "og-image.png"
image.save(output_path, "PNG")
print("Saved og-image.png successfully!")
