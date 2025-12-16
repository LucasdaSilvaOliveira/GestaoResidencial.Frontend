import type { ReactNode } from "react";

type PageContainerProps = {
    children: ReactNode;
};

export default function Container({ children }: PageContainerProps) {
    return (
        <div className="bg-gray-900 pt-32 px-32 flex align-items justify-center">
            {children}
        </div>
    );
}