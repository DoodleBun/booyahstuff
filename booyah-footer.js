// Booyah TCG Footer - Full bleed, mobile optimized, hover effects
(function() {
    const footerHTML = `
        <div id="booyah-footer" style="width: 100vw; margin-left: calc(-50vw + 50%); background: rgba(45, 35, 130, 0.75); color: #ffffff; padding: 20px 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif; font-size: 18px; font-weight: 700; box-shadow: 0 -6px 20px rgba(45, 35, 130, 0.5); border-top: 4px solid rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; line-height: 1.4; position: relative; z-index: 9999;">

            <!-- Logo + Text -->
            <div style="display: flex; align-items: center; gap: 14px;">
                <img src="https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/BooyahLogo2.png" 
                     alt="Booyah TCG" 
                     style="height: 50px; width: auto;">
                <span>Ready to join the game? Then...</span>
            </div>

            <!-- Gold Button -->
            <a href="https://booyahtcg.com/#join" 
               class="cta-btn gold-btn"
               style="background: linear-gradient(#ffdd66, #e6b800); color: #2c2c2c; padding: 13px 26px; border-radius: 50px; text-decoration: none; font-weight: 800; box-shadow: 0 6px 0 #b38f00, 0 8px 15px rgba(0,0,0,0.3); transition: all 0.25s ease; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;">
                Join the Crew & Play!
            </a>

            <!-- Discord Button -->
            <a href="https://discord.com/invite/FADRWF5FZK" 
               class="cta-btn discord-btn"
               style="background: linear-gradient(#6b4eff, #4a2fd4); color: #ffffff; padding: 13px 24px; border-radius: 50px; text-decoration: none; font-weight: 800; box-shadow: 0 6px 0 #3720a0, 0 8px 15px rgba(0,0,0,0.3); transition: all 0.25s ease; white-space: nowrap; display: inline-flex; align-items: center; gap: 8px;">
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.svg" 
                     alt="Discord" 
                     style="height: 22px; width: 22px;">
                Join Discord
            </a>
        </div>
    `;

    // Create and inject the footer
    const footerContainer = document.createElement('div');
    footerContainer.innerHTML = footerHTML;
    document.body.appendChild(footerContainer.firstElementChild);

    // Add hover styles
    const style = document.createElement('style');
    style.textContent = `
        .cta-btn {
            transform: scale(1);
        }
        .gold-btn:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 6px 0 #b38f00, 
                        0 12px 25px rgba(0,0,0,0.4),
                        0 0 25px rgba(255, 230, 120, 0.9) !important;
            filter: brightness(1.12);
        }
        .discord-btn:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 6px 0 #3720a0, 
                        0 12px 25px rgba(0,0,0,0.4),
                        0 0 25px rgba(120, 90, 255, 0.85) !important;
            filter: brightness(1.15);
        }

        /* Mobile - Very small */
        @media (max-width: 768px) {
            #booyah-footer {
                padding: 12px 10px !important;
                font-size: 11px !important;
                gap: 6px !important;
            }
            #booyah-footer img[alt="Booyah TCG"] {
                height: 26px !important;
            }
            .cta-btn {
                padding: 8px 14px !important;
                font-size: 12.5px !important;
                border-radius: 40px !important;
            }
            .discord-btn img {
                height: 14px !important;
                width: 14px !important;
            }
        }
    `;
    document.head.appendChild(style);
})();
