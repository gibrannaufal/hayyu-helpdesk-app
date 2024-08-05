import { createContext, useState, ReactNode } from "react";
import { getCookie, setCookie } from "../../utils/functions/cookie";

type DarkModeContextType = {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
	undefined
);

type Props = {
	children: ReactNode;
};

export const DarkModeProvider = ({ children }: Props) => {
	let prefersDark =
		getCookie("prefersDark") ||
		window.matchMedia("(prefers-color-scheme: dark)").matches;
	if (typeof prefersDark === "string") {
		prefersDark = JSON.parse(prefersDark) as boolean;
	}

	setCookie("prefersDark", JSON.stringify(prefersDark), 30);

	const [isDarkMode, setIsDarkMode] = useState(prefersDark);

	const toggleDarkMode = () => {
		setCookie("prefersDark", JSON.stringify(!isDarkMode), 30);
		setIsDarkMode(!isDarkMode);
	};

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};
