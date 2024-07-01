import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import StoryService from "../components/service/StoryService";

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedStories = await StoryService.getStories();
            setStories(fetchedStories);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchUserStories = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const fetchedStories = await StoryService.getUserStories(userId);
            setStories(fetchedStories);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadStory = useCallback(
        async (formData) => {
            setLoading(true);
            setError(null);
            try {
                await StoryService.uploadStory(formData);
                await fetchStories();
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        [fetchStories]
    );

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    return (
        <StoryContext.Provider
            value={{ stories, loading, error, fetchUserStories, uploadStory }}
        >
            {children}
        </StoryContext.Provider>
    );
};

export { StoryContext };
