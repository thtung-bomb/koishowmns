export default interface DropdownAvatarProps {
    dataUser: {
        name: string | null;
        email: string | null;
        avatar: string | null;
        googleId?: string;
        role: string | null;
    };
}