// constants/serviceCategoriesData.ts

export type SubCategoryItem = {
    id: string;
    name: string;
    icon: any; // require() returns a number
  };
  
  export type ServiceCategory = {
    id: string;
    name: string;
    subCategories: SubCategoryItem[];
  };
  
  // Handyman Sub Categories
  export const handymanSubCategories: SubCategoryItem[] = [
    { id: 'hm1', name: 'Carpenter', icon: require('../../assets/images/Handyman/Carpenter.png') },
    { id: 'hm2', name: 'Plumber', icon: require('../../assets/images/Handyman/Plumber.png') },
    { id: 'hm3', name: 'Electrician', icon: require('../../assets/images/Handyman/Electrician.png') },
    { id: 'hm4', name: 'AC Repair', icon: require('../../assets/images/Handyman/AC-Repair.png') },
    { id: 'hm5', name: 'TV Repair', icon: require('../../assets/images/Handyman/TV-Repair.png') },
    { id: 'hm6', name: 'Painter', icon: require('../../assets/images/Handyman/Painter.png') },
    { id: 'hm7', name: 'Mechanic', icon: require('../../assets/images/Handyman/Mechanic.png') },
    { id: 'hm8', name: 'Computer', icon: require('../../assets/images/Handyman/Computer.png') },
    { id: 'hm9', name: 'Mobile', icon: require('../../assets/images/Handyman/Mobile.png') },
  ];
  
  // Estheticians Sub Categories
  export const estheticiansSubCategories: SubCategoryItem[] = [
    { id: 'es1', name: 'Basic Facial', icon: require('../../assets/images/Estheticians/facial.png') },
    { id: 'es2', name: 'Chemical Peel', icon: require('../../assets/images/Estheticians/peel.png') },
    { id: 'es3', name: 'Microderm', icon: require('../../assets/images/Estheticians/microderm.png') },
    { id: 'es4', name: 'Waxing', icon: require('../../assets/images/Estheticians/waxing.png') },
    { id: 'es5', name: 'Lash Lift', icon: require('../../assets/images/Estheticians/lashes.png') },
    { id: 'es6', name: 'Brow Tint', icon: require('../../assets/images/Estheticians/brows.png') },
    { id: 'es7', name: 'Extractions', icon: require('../../assets/images/Estheticians/extractions.png') },
    { id: 'es8', name: 'Dermaplane', icon: require('../../assets/images/Estheticians/dermaplaning.png') },
    { id: 'es9', name: 'Skin Consult', icon: require('../../assets/images/Estheticians/skinConsultant.png') },
  ];
  
  // Music Studio Sub Categories
  export const musicStudioSubCategories: SubCategoryItem[] = [
    { id: 'ms1', name: 'Piano', icon: require('../../assets/images/MusicStudio/piano.png') },
    { id: 'ms2', name: 'Guitar', icon: require('../../assets/images/MusicStudio/guitar.png') },
    { id: 'ms3', name: 'Drums', icon: require('../../assets/images/MusicStudio/drums.png') },
    { id: 'ms4', name: 'Violin', icon: require('../../assets/images/MusicStudio/violin.png') },
    { id: 'ms5', name: 'Vocal Training', icon: require('../../assets/images/MusicStudio/vocal.png') },
    { id: 'ms6', name: 'Music Production', icon: require('../../assets/images/MusicStudio/production.png') },
  ];
  
  // Barbers Sub Categories
  export const barbersSubCategories: SubCategoryItem[] = [
    { id: 'br1', name: 'Haircut', icon: require('../../assets/images/Barbers/hair-cut.png') },
    { id: 'br2', name: 'Beard Trim', icon: require('../../assets/images/Barbers/beard-trimming.png') },
    { id: 'br3', name: 'Hot Towel Shave', icon: require('../../assets/images/Barbers/shave.png') },
    { id: 'br4', name: 'Hair Coloring', icon: require('../../assets/images/Barbers/hair-color.png') },
    { id: 'br5', name: 'Facial', icon: require('../../assets/images/Barbers/facial.png') },
  ];
  
  // Yoga Sub Categories
  export const yogaSubCategories: SubCategoryItem[] = [
    { id: 'yg1', name: 'Hatha Yoga', icon: require('../../assets/images/Yoga/hatha.png') },
    { id: 'yg2', name: 'Vinyasa Flow', icon: require('../../assets/images/Yoga/vinyasa.png') },
    { id: 'yg3', name: 'Ashtanga', icon: require('../../assets/images/Yoga/ashtanga.png') },
    { id: 'yg4', name: 'Kundalini', icon: require('../../assets/images/Yoga/kundalini.png') },
    { id: 'yg5', name: 'Yin Yoga', icon: require('../../assets/images/Yoga/yin.png') },
    { id: 'yg6', name: 'Meditation', icon: require('../../assets/images/Yoga/meditation.png') },
  ];
  
  // Main service categories with their subcategories
  export const serviceCategories: ServiceCategory[] = [
    {
      id: 'c1',
      name: 'Estheticians',
      subCategories: estheticiansSubCategories,
    },
    {
      id: 'c2',
      name: 'Music Studio',
      subCategories: musicStudioSubCategories,
    },
    {
      id: 'c3',
      name: 'Handyman',
      subCategories: handymanSubCategories,
    },
    {
      id: 'c4',
      name: 'Barbers',
      subCategories: barbersSubCategories,
    },
    {
      id: 'c5',
      name: 'Yoga',
      subCategories: yogaSubCategories,
    },
  ];
  
  // Helper function to get subcategories by category name
  export const getSubCategoriesByCategoryName = (categoryName: string): SubCategoryItem[] => {
    const category = serviceCategories.find(cat => cat.name === categoryName);
    return category?.subCategories || [];
  };
  
  // Helper function to get subcategories by category ID
  export const getSubCategoriesByCategoryId = (categoryId: string): SubCategoryItem[] => {
    const category = serviceCategories.find(cat => cat.id === categoryId);
    return category?.subCategories || [];
  };