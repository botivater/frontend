import Link from "next/link";


export const NavigationLinkItem: React.FC<{ text: string; href: string; }> = ({ text, href }) => {
    return (
        <li>
            <Link href={href}><a>{ text }</a></Link>
        </li>
    );
}
