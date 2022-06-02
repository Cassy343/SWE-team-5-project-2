import axios from "axios";
import { createContext } from "react";

export const ProfileContext = createContext(null);

export const getProfileStaticContext = async token => {
    const profile = await axios.get(`profile?spotifyToken=${token}`);
    return {
        id: profile.data.id,
        name: profile.data.name
    };
};
