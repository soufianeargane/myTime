import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): void => {
    v2.config({
      cloud_name: 'dichmmwgx',
      api_key: '591869886721933',
      api_secret: 'aqgpMyrZqxoCBLq9Gto0TpiGmRg',
    });
  },
};

// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'dichmmwgx',
//   api_key: '591869886721933',
//   api_secret: 'aqgpMyrZqxoCBLq9Gto0TpiGmRg',
// });
