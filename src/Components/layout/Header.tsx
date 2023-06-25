import React, { memo } from "react";

type LayoutProps = {
} & React.HTMLAttributes<HTMLDivElement>;

function HeaderImpl(props: LayoutProps) {
    const { children } = props;
    return (
        <div className="flex flex-col h-[56px]">
            {children}
        </div>
    );
}

export const Header = memo(HeaderImpl);