import { FC } from 'react';
import {
    AtSign,
    DollarSign,
    FileText,
    Globe,
    MapPin,
    MessageSquare,
    Paperclip,
    Twitter,
    Users,
} from 'react-feather';
import { GrantProgram } from '../../../backend/src/grant.type';

export const GrantLinks: FC<{ grant: GrantProgram }> = ({ grant }) => {
    // TODO add hover to icons
    return (
        <div className="grid row-auto grid-cols-2 sm:grid-cols-3 gap mt-2 text-sm">
            {grant.website && (
                <div className="text-white hover:underline brightness-75">
                    <a
                        href={grant.website}
                        target="_blank"
                        className="text-ellipsis"
                    >
                        <Globe className="inline w-4 mr-1" />
                        Website
                    </a>
                </div>
            )}

            {grant.whitepaper && (
                <div className="text-white hover:underline brightness-75">
                    <a
                        href={grant.whitepaper}
                        target="_blank"
                        className="truncate"
                    >
                        <FileText className="inline w-4 mr-1" />
                        Whitepaper
                    </a>
                </div>
            )}

            {grant.twitter && (
                <div className="text-white hover:underline brightness-75">
                    <a
                        href={grant.twitter}
                        target="_blank"
                        className="truncate"
                    >
                        <Twitter className="inline w-4 mr-1" />
                        Twitter
                    </a>
                </div>
            )}

            {grant.discord && (
                <div className="text-white hover:underline brightness-75">
                    <a
                        href={grant.discord}
                        target="_blank"
                        className="truncate"
                    >
                        <Users className="inline w-4 mr-1" />
                        Discord
                    </a>
                </div>
            )}

            {grant.telegram && (
                <div className="text-white hover:underline brightness-75">
                    <a
                        href={grant.telegram}
                        target="_blank"
                        className="truncate"
                    >
                        <MessageSquare className="inline w-4 mr-1" />
                        {new URL(grant.telegram).hostname === 't.me' ? '@' + new URL(grant.telegram).pathname.substring(1) : grant.telegram}
                    </a>
                </div>
            )}

            {grant.currency && (
                <div className="text-white brightness-75">
                    <DollarSign className="inline w-4 mr-1" />
                    {grant.currency}
                </div>
            )}

            {grant.ecosystem && (
                <div className="text-white brightness-75">
                    <MapPin className="inline w-4 mr-1" />
                    {grant.ecosystem}
                </div>
            )}
        </div>
    );
};
