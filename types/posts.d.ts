export type Post = {
  id: number,
  type: 'offer' | 'request',
  latitude: number,
  longitude: number,
  plant_name: string,
  image_url: string | null,
  description: string | null,
  contact_url: string
};

export type NewPost = {
  type: 'offer' | 'request',
  location: {
    latitude: number,
    longitude: number
  },
  plantName: string,
  imageUrl: string | null,
  description: string | null,
  contact: string
};

export type EditPost = {
  type?: 'offer' | 'request',
  location?: {
    latitude: number,
    longitude: number
  },
  plantName?: string,
  imageUrl?: string | null,
  description?: string | null,
  contact?: string
};
