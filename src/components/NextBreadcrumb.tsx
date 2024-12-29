'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type TBreadCrumbProps = {
    homeElement: ReactNode;
    separator: ReactNode;
    containerClasses?: string;
    listClasses?: string;
    activeClasses?: string;
    capitalizeLinks?: boolean;
};

const NextBreadcrumb = ({
    homeElement,
    separator,
    containerClasses = 'flex items-center space-x-2',
    listClasses = 'text-sm text-gray-600 hover:text-black',
    activeClasses = 'font-bold text-black',
    capitalizeLinks = true,
}: TBreadCrumbProps) => {
    const paths = usePathname();
    const pathNames = paths.split('/').filter((path) => path);

    return (
        <div className="py-2">
            <ul className={containerClasses}>
                <li className={listClasses}>
                    <Link href={'/'}>{homeElement}</Link>
                </li>
                {pathNames.length > 0 && separator}
                {pathNames.map((link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`;
                    let itemClasses =
                        paths === href
                            ? `${listClasses} ${activeClasses}`
                            : listClasses;
                    let itemLink = capitalizeLinks
                        ? link[0].toUpperCase() + link.slice(1)
                        : link;
                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses}>
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && separator}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};

export default NextBreadcrumb;
