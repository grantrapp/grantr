type GrantStatus = 'ongoing';

type GrantEcosystem = 'ethereum' | 'solana' | 'polygon' | 'aave';

type SocialType = 'discord' | 'twitter';

export type GrantProgram = {
    id: string;
    name: string;
    organization_id: string;
    image_url: string;
    apply_url: string;
    status: GrantStatus;
    min_amount: string;
    max_amount: string;
    currency: string;
    tags: string;
    description: string;
    website: string;
    ecosystem: GrantEcosystem[];
    socials: Record<SocialType, string>;
    hit: number; // private
};
