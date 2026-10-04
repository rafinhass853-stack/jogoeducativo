export type AvatarId = "explorador" | "cientista" | "artista" | "leitor";

export interface ChildProfile {
  name: string;
  age: number;
  avatar: AvatarId;
  stars: number;
  xp: number;
  level: number;
  completedGames: string[];
}

export const defaultProfile: ChildProfile = {
  name: "Meu pequeno aprendiz",
  age: 5,
  avatar: "explorador",
  stars: 0,
  xp: 0,
  level: 1,
  completedGames: [],
};

export const avatars = [
  { id: "explorador" as const, icon: "🧭", label: "Explorador" },
  { id: "cientista" as const, icon: "🔬", label: "Cientista" },
  { id: "artista" as const, icon: "🎨", label: "Artista" },
  { id: "leitor" as const, icon: "📚", label: "Leitor" },
];

export function levelFromXp(xp: number) {
  return Math.floor(xp / 100) + 1;
}

export function xpForNextLevel(level: number) {
  return level * 100;
}