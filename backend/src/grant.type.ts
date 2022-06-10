type GrantStatus = 'ongoing';

type GrantTag = '';

type GrantEcosystem = 'ethereum' | 'solana' | 'polygon' | 'aave';

type SocialType = 'discord' | 'twitter';

export type GrantProgram = {
    id: string;
    name: string;
    organization_id: string;
    status: GrantStatus;
    min_amount: string;
    max_amount: string;
    tags: GrantTag[];
    description: string;
    website: string;
    ecosystem: GrantEcosystem[];
    socials: Record<SocialType, string>;
};
