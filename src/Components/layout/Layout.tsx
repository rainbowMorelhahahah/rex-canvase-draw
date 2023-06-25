import React, { memo, useMemo } from "react";
import { Header } from ".";

type LayoutProps = {
    header?: React.ReactNode | React.ReactElement,
} & React.HTMLAttributes<HTMLDivElement>;

function LayoutImpl(props: LayoutProps) {
    const { header, children } = props;

    const renderCustomHeader = useMemo(() => {
        return header || <Header />
    }, [header])

    return (
        <div className="h-full">
            <header>{renderCustomHeader}</header>
            {children}
        </div>
    );
}

export const Layout = memo(LayoutImpl);