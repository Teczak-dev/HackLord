export interface Account {
    id: number;
    name: string;
    difficulty: "easy" | "medium" | "hard" | "tutorial";
    deletable: boolean;
    profile_pic: string;
}
