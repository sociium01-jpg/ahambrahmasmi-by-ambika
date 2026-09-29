"use client";

import React, { useEffect, useState } from "react";

export interface VisionTile {
  id: string;
  category: string;
  affirmation: string;
  imageUrl: string;
}

interface VisionBoardBuilderProps {
  seekerName: string;
  onExportPdf: (title: string, bodyHtml: string) => void;
}

const DEFAULT_VISION_TILES: VisionTile[] = [
  {
    id: "tile-1",
    category: "1. Inner Peace & Alignment",
    affirmation: "Nothing is more important than that I feel good",
    imageUrl: "/images/cta-mountain.jpg",
  },
  {
    id: "tile-2",
    category: "2. Abundant Flow & Prosperity",
    affirmation: "Abundance flows to me effortlessly in divine timing",
    imageUrl: "/images/hero-lotus.png",
  },
  {
    id: "tile-3",
    category: "3. Radiant Health & Energy",
    affirmation: "My body is a joyful, thriving instrument of Source",
    imageUrl: "/images/lotus-divider.png",
  },
  {
    id: "tile-4",
    category: "4. Loving Relationships",
    affirmation: "I attract warm, uplifting, harmonious connections",
    imageUrl: "/images/ambika.png",
  },
  {
    id: "tile-5",
    category: "5. Inspired Purpose & Creation",
    affirmation: "Every day I create from joy, clarity, and ease",
    imageUrl: "/images/cta-mountain.jpg",
  },
  {
    id: "tile-6",
    category: "6. Sacred Sanctuary & Freedom",
    affirmation: "Aham Brahmasmi — I am the Core of my reality",
    imageUrl: "/images/hero-lotus.png",
  },
];

export function VisionBoardBuilder({
  seekerName,
  onExportPdf,
}: VisionBoardBuilderProps) {
  const [tiles, setTiles] = useState<VisionTile[]>(DEFAULT_VISION_TILES);
  const [coreIntention, setCoreIntention] = useState<string>(
    "I live in joyful alignment, trusting that everything I desire unfolds with grace."
  );
  const [exportingWallpaper, setExportingWallpaper] = useState<boolean>(false);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aham_seeker_vision_board");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.tiles) && parsed.tiles.length > 0) {
          setTiles(parsed.tiles);
        }
        if (parsed.coreIntention) {
          setCoreIntention(parsed.coreIntention);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const persistBoard = (nextTiles: VisionTile[], nextIntention: string) => {
    try {
      localStorage.setItem(
        "aham_seeker_vision_board",
        JSON.stringify({
          tiles: nextTiles,
          coreIntention: nextIntention,
        })
      );
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch {
      // ignore quota errors
    }
  };

  const handlePhotoUpload = (tileId: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const next = tiles.map((t) =>
          t.id === tileId ? { ...t, imageUrl: reader.result as string } : t
        );
        setTiles(next);
        persistBoard(next, coreIntention);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAffirmationChange = (tileId: string, value: string) => {
    const next = tiles.map((t) =>
      t.id === tileId ? { ...t, affirmation: value } : t
    );
    setTiles(next);
    persistBoard(next, coreIntention);
  };

  const handleCategoryChange = (tileId: string, value: string) => {
    const next = tiles.map((t) =>
      t.id === tileId ? { ...t, category: value } : t
    );
    setTiles(next);
    persistBoard(next, coreIntention);
  };

  // Export as Printable PDF via parent helper
  const handleDownloadPdf = () => {
    const gridHtml = `
      <p style="text-align:center;font-size:21px;font-style:italic;margin:0 0 22px;color:#4E3B2C;">
        “${coreIntention}”
      </p>
      <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:18px;">
        ${tiles
          .map(
            (t) => `
          <div style="border:1.5px solid #DEC8A2;border-radius:18px;overflow:hidden;background:#FFFFFF;padding:12px;text-align:center;">
            <img src="${t.imageUrl}" alt="${t.category}" style="width:100%;height:170px;object-fit:cover;border-radius:12px;" />
            <div style="font-family:sans-serif;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#684F7A;margin-top:10px;font-weight:700;">
              ${t.category}
            </div>
            <div style="font-family:'Great Vibes',cursive;font-size:28px;color:#8E1B25;margin-top:4px;line-height:1.2;">
              ${t.affirmation}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    onExportPdf(`${seekerName || "Seeker"}’s Sacred Vision Board`, gridHtml);
  };

  // Export as 1080x1920 Phone Wallpaper PNG using HTML5 Canvas
  const handleDownloadPhoneWallpaper = async () => {
    setExportingWallpaper(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Sacred Warm Cream & Lavender Gradient Background
      const grad = ctx.createLinearGradient(0, 0, 1080, 1920);
      grad.addColorStop(0, "#FBF5EE");
      grad.addColorStop(0.5, "#F3ECF8");
      grad.addColorStop(1, "#F3E3C8");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Double Sacred Border Frame
      ctx.strokeStyle = "#846B96";
      ctx.lineWidth = 4;
      ctx.strokeRect(36, 36, 1008, 1848);
      ctx.strokeStyle = "#C8B87A";
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, 984, 1824);

      // Header Text
      ctx.fillStyle = "#684F7A";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("AHAM BRAHMASMI · SACRED VISION BOARD", 540, 115);

      ctx.fillStyle = "#8E1B25";
      ctx.font = "italic 46px Georgia, serif";
      ctx.fillText(`${seekerName || "My"}’s Alignment Vision`, 540, 175);

      ctx.fillStyle = "#4E3B2C";
      ctx.font = "italic 24px Georgia, serif";
      ctx.fillText(coreIntention.slice(0, 68), 540, 225);

      // Load images helper
      const loadImg = (src: string): Promise<HTMLImageElement | null> =>
        new Promise((resolve) => {
          const img = new window.Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        });

      // Draw 6 cards in a 2x3 grid
      const cardW = 440;
      const cardH = 460;
      const startX = 80;
      const startY = 270;
      const gapX = 40;
      const gapY = 36;

      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = startX + col * (cardW + gapX);
        const y = startY + row * (cardH + gapY);

        // Card background
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x, y, cardW, cardH);
        ctx.strokeStyle = "#DEC8A2";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cardW, cardH);

        // Image area
        const img = await loadImg(tile.imageUrl);
        if (img) {
          ctx.drawImage(img, x + 16, y + 16, cardW - 32, 280);
        } else {
          ctx.fillStyle = "#EAE0F2";
          ctx.fillRect(x + 16, y + 16, cardW - 32, 280);
        }

        // Category label
        ctx.fillStyle = "#684F7A";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(tile.category.toUpperCase(), x + cardW / 2, y + 330);

        // Cursive / Serif Affirmation (wrapped into 2 lines)
        ctx.fillStyle = "#8E1B25";
        ctx.font = "italic 26px Georgia, serif";
        const words = tile.affirmation.split(" ");
        const mid = Math.ceil(words.length / 2);
        const line1 = words.slice(0, mid).join(" ");
        const line2 = words.slice(mid).join(" ");
        ctx.fillText(line1, x + cardW / 2, y + 375);
        if (line2) {
          ctx.fillText(line2, x + cardW / 2, y + 412);
        }
      }

      // Footer
      ctx.fillStyle = "#684F7A";
      ctx.font = "22px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "I am the Core from which my life experience emerges · Ahambrahmasmi by Ambika",
        540,
        1835
      );

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "ahambrahmasmi-vision-board-wallpaper.png";
      a.click();
    } finally {
      setExportingWallpaper(false);
    }
  };

  return (
    <div className="flex flex-col gap-[22px]">
      {/* Header Banner */}
      <div className="rounded-[26px] bg-beige-card/90 border border-beige-border p-[24px] sm:p-[30px] flex flex-col lg:flex-row lg:items-center justify-between gap-[18px]">
        <div className="flex flex-col gap-[6px]">
          <span className="font-cursive text-[30px] leading-none text-lavender-deep">
            Session 5 · Belief, Affirmation &amp; Vision Board
          </span>
          <h2 className="m-0 font-playfair text-[26px] sm:text-[32px] font-medium text-ink">
            Interactive Digital Vision Board Builder
          </h2>
          <p className="m-0 font-sans text-[14px] text-body max-w-[640px]">
            Upload 4–6 inspiring photos from your device, pair each with a
            personal affirmation in cursive script, and export your board as a{" "}
            <strong>Phone Wallpaper (PNG)</strong> or{" "}
            <strong>Printable PDF</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-[10px]">
          <button
            type="button"
            onClick={handleDownloadPhoneWallpaper}
            disabled={exportingWallpaper}
            className="btn-3d-maroon inline-flex min-h-[46px] items-center justify-center gap-[8px] rounded-full px-[22px] py-[11px] font-sans text-[13px] font-semibold text-white cursor-pointer"
          >
            <span>
              {exportingWallpaper
                ? "Rendering Wallpaper..."
                : "📱 Download Phone Wallpaper (PNG)"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="min-h-[46px] rounded-full border border-maroon bg-white px-[20px] py-[11px] font-sans text-[13px] font-semibold text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors"
          >
            📄 Export Printable PDF
          </button>
        </div>
      </div>

      {/* Overarching Intention Input */}
      <div className="rounded-[22px] bg-lavender/75 border border-lavender-border p-[18px] sm:p-[22px] flex flex-col sm:flex-row sm:items-center justify-between gap-[12px]">
        <label className="flex-1 flex flex-col gap-[4px] font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-lavender-deep">
          <span>My Overarching 5-Week Vision Statement</span>
          <input
            type="text"
            value={coreIntention}
            onChange={(e) => {
              setCoreIntention(e.target.value);
              persistBoard(tiles, e.target.value);
            }}
            className="h-[44px] rounded-[12px] border border-lavender-border bg-white px-[14px] font-sans text-[14px] font-medium text-ink normal-case tracking-normal"
          />
        </label>
        {savedToast && (
          <span className="font-sans text-[12px] font-bold text-maroon shrink-0">
            ✓ Auto-saved to your portal
          </span>
        )}
      </div>

      {/* 6 Interactive Vision Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="sacred-double-frame rounded-[26px] p-[18px] flex flex-col justify-between gap-[14px] bg-white shadow-sm"
          >
            {/* Image Preview + Upload Overlay */}
            <div className="relative h-[200px] w-full overflow-hidden rounded-[18px] border border-beige-border bg-beige-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.imageUrl}
                alt={tile.category}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <label className="absolute bottom-[10px] right-[10px] inline-flex items-center gap-[6px] rounded-full bg-[#2C1A26]/85 px-[14px] py-[7px] font-sans text-[11px] font-semibold text-white shadow-md backdrop-blur-md hover:bg-maroon cursor-pointer transition-colors">
                <span>📷 Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handlePhotoUpload(tile.id, e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
              </label>
            </div>

            {/* Category & Cursive Affirmation Preview */}
            <div className="flex flex-col gap-[8px] text-center px-[6px]">
              <input
                type="text"
                value={tile.category}
                onChange={(e) => handleCategoryChange(tile.id, e.target.value)}
                aria-label="Vision tile category"
                className="border-0 bg-transparent text-center font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-lavender-deep focus:outline-none focus:underline"
              />

              {/* Live Cursive Display */}
              <p className="m-0 min-h-[56px] flex items-center justify-center font-cursive text-[30px] sm:text-[32px] leading-[1.18] text-maroon px-[4px]">
                “{tile.affirmation}”
              </p>

              {/* Edit Affirmation Input */}
              <input
                type="text"
                value={tile.affirmation}
                onChange={(e) =>
                  handleAffirmationChange(tile.id, e.target.value)
                }
                placeholder="Write your custom affirmation..."
                className="h-[38px] rounded-[10px] border border-beige-border bg-beige-card/45 px-[12px] text-center font-sans text-[12px] text-ink"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
