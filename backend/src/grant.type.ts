type GrantStatus = 'ongoing';

type GrantEcosystem = 'ethereum' | 'solana' | 'polygon' | 'aave';

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
    discord: string;
    twitter: string;
    hit: number; // private
    whitepaper: string;
    contact: string;
};
