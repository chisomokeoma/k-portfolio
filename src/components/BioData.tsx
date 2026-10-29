import Image from "next/image";
import type { ReactNode } from "react";
import { Container, SectionHeading, reveal } from "./ui";

// Placeholder copy from the Figma file — replace with real role descriptions.
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const ROLES = [
  { title: "Founder", org: "Langovest", period: "2022 - Present", logo: "/images/langovest-logo.png" },
  { title: "Founder", org: "InfraMobile", period: "2022 - Present", icon: "/icons/inframobile.svg" },
];

const EDUCATION = [
  { title: "MPH - National University of Kyiv-Mohyla Academy", subtitle: "Degree Title" },
  { title: "MBBS - Ivano-Frankivsk National Medical University", subtitle: "Degree Title" },
];

const SECTORS = [
  { label: "Block Chain", icon: "/icons/blockchain.svg" },
  { label: "Infrastructure Development", icon: "/icons/infrastructure.svg" },
  { label: "System Thinking", icon: "/icons/systems.svg" },
];

function Card({ label, delay, children }: { label: string; delay: number; children: ReactNode }) {
  return (
    <div
      {...reveal(delay)}
      className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-6"
    >
      <h3 className="text-caption uppercase text-white/80 lg:text-body">{label}</h3>
      {children}
    </div>
  );
}

// Parent list items carry `group` so hovering a row lights up its tile.
function Tile({ children }: { children: ReactNode }) {
  return (
    <div className="relative grid size-20 flex-none place-items-center overflow-hidden rounded-[3.2px] border border-white/5 bg-white/[0.03] transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/[0.06]">
      {children}
    </div>
  );
}

// Intrinsic sizes of the exported SVGs (Tailwind's `img { height: auto }` keeps them honest).
const ICON_SIZES: Record<string, [number, number]> = {
  "/icons/inframobile.svg": [40, 52],
  "/icons/education.svg": [48, 66],
  "/icons/blockchain.svg": [46, 62],
  "/icons/infrastructure.svg": [46, 53],
  "/icons/systems.svg": [56, 67],
};

function TileIcon({ src }: { src: string }) {
  const [width, height] = ICON_SIZES[src];
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      className="transition-transform duration-300 group-hover:-translate-y-1"
    />
  );
}

const itemTitle = "text-small font-medium text-white lg:text-body";
const itemSubtitle = "text-caption text-white/90 lg:text-small";

export default function BioData() {
  return (
    <section className="bg-ink py-14 lg:py-20">
      <Container className="flex flex-col gap-6 lg:gap-14">
        <SectionHeading
          eyebrow="Bio-Data"
          title="Physician by training, infrastructure thinker by conviction"
        />

        <div className="flex flex-col gap-4 lg:gap-6">
          <Card label="Current Role" delay={0}>
            <ul className="flex flex-col gap-6">
              {ROLES.map((role) => (
                <li key={role.org} className="group flex gap-4">
                  <Tile>
                    {role.logo ? (
                      <Image
                        src={role.logo}
                        alt={`${role.org} logo`}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <TileIcon src={role.icon!} />
                    )}
                  </Tile>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className={itemTitle}>{role.title}</p>
                      <p className={itemSubtitle}>{role.org}</p>
                      <p className="text-caption text-white/60">{role.period}</p>
                    </div>
                    <p className="text-caption text-white/60">{LOREM}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card label="Educational Background" delay={120}>
            <ul className="flex flex-col gap-6">
              {EDUCATION.map((edu) => (
                <li key={edu.title} className="group flex items-center gap-4">
                  <Tile>
                    <TileIcon src="/icons/education.svg" />
                  </Tile>
                  <div>
                    <p className={itemTitle}>{edu.title}</p>
                    <p className={itemSubtitle}>{edu.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card label="Sector Focus" delay={240}>
            <ul className="flex flex-col gap-6 lg:flex-row">
              {SECTORS.map((sector) => (
                <li key={sector.label} className="group flex items-center gap-4">
                  <Tile>
                    <TileIcon src={sector.icon} />
                  </Tile>
                  <p className={itemTitle}>{sector.label}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
}
