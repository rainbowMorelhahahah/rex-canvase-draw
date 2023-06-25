import React, { memo } from "react";

type LayoutProps = {
} & React.HTMLAttributes<HTMLDivElement>;

function HeaderImpl(props: LayoutProps) {
    const { children } = props;
    return (
        <div className="flex flex-col h-[56px] bg-[#151515]">
            {children}
        </div>
    );
}

export const Header = memo(HeaderImpl);