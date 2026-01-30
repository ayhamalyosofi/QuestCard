
export const CATEGORIES = [
  {
    id: 'prophets',
    name: 'الأنبياء',
    imageUrl: 'https://images.unsplash.com/photo-1534067783941-51c9c7f6e2db?q=80&w=2940&auto=format&fit=crop',
    colorClass: 'bg-[#A61E4D]', // روز داكن حيوي
    iconSvgPath: 'M18,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C20,2.9,19.1,2,18,2z M18,20H6V4h2v8l2.5-1.5L13,12V4h5V20z'
  },
  {
    id: 'companions',
    name: 'الصحابة',
    imageUrl: 'https://images.unsplash.com/photo-1594953931145-22728271ed4b?q=80&w=2940&auto=format&fit=crop',
    colorClass: 'bg-[#084F41]', // أخضر زمردي داكن
    iconSvgPath: 'M18,2H6C4.9,2,4,2.9,4,4v1c0,1.66,1.34,3,3,3h10v12c0,1.1-0.9,2-2,2H7c-1.1,0-2-0.9-2-2V9c0-0.55-0.45-1-1-1S3,8.45,3,9v11c0,2.21,1.79,4,4,4h8c2.21,0,4-1.79,4-4V4C19,2.9,18.1,2,18,2z'
  },
  {
    id: 'football',
    name: 'كرة قدم',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-ce079e0061e3?q=80&w=2940&auto=format&fit=crop',
    colorClass: 'bg-[#2B4DAE]', // أزرق ملكي
    iconSvgPath: 'M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M7,13l3-3l3,3l3-3l1.4,1.4L12,17.8L6.6,12.4L7,13z'
  },
  {
    id: 'friends-situations',
    name: 'مواقف',
    imageUrl: 'https://images.unsplash.com/photo-1522204523234-87295a7833cc?q=80&w=2940&auto=format&fit=crop',
    colorClass: 'bg-[#2E7284]', // بترولي / سماوي داكن
    iconSvgPath: 'M16,11c1.66,0,2.99-1.34,2.99-3S17.66,5,16,5s-3,1.34-3,3S14.34,11,16,11z M6,11c1.66,0,2.99-1.34,2.99-3S7.66,5,6,5S3,6.34,3,8S4.34,11,6,11z M16,13c-2.33,0-7,1.17-7,3.5V19h14v-2.5C23,14.17,18.33,13,16,13z M6,13c-0.34,0-0.74,0.03-1.16,0.08C6.03,14.07,7,15.35,7,17v2H1v-2.5C1,14.17,4.33,13,6,13z'
  },
  {
    id: 'fun-riddles',
    name: 'فوازير ممتعة',
    imageUrl: 'https://images.unsplash.com/photo-1581092106497-7e61e27a9354?q=80&w=2940&auto=format&fit=crop',
    colorClass: 'bg-[#7C2A92]', // بنفسجي فوشيا
    iconSvgPath: 'M12,2C8.13,2,5,5.13,5,9c0,2.38,1.19,4.47,3,5.74V17c0,0.55,0.45,1,1,1h6c0.55,0,1-0.45,1-1v-2.26c1.81-1.27,3-3.36,3-5.74C19,5.13,15.87,2,12,2z M12,20c-1.1,0-2,0.9-2,2h4C14,20.9,13.1,20,12,20z'
  },
  {
    id: 'general-religion',
    name: 'الدين',
    imageUrl: 'https://images.unsplash.com/photo-1549419137-a1e49111c1d0?q=80&w=2940&auto=format&fit=crop',
    colorClass: 'bg-[#5B391E]', // بني ديني وقور
    iconSvgPath: 'M12.14,2.14L12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c1.85,0,3.58-0.5,5.05-1.37c-4.45-0.67-7.91-4.52-7.91-9.15c0-4.6,3.42-8.43,7.84-9.12C15.53,2.5,13.91,2.14,12.14,2.14z'
  },
  {
    id: 'general-questions',
    name: 'أسئلة عامة',
    imageUrl: 'https://images.unsplash.com/photo-1543321151-24c11438a2e5?q=80&w=2940&auto=format&fit=crop',
    colorClass: 'bg-[#4B29A8]', // بنفسجي داكن
    iconSvgPath: 'M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M11,19.93c-3.95-0.49-7-3.85-7-7.93c0-0.62,0.08-1.23,0.21-1.82L9,15v1c0,1.1,0.9,2,2,2v1.93z M17.9,17.39C17.64,16.58,16.9,16,16,16h-1v-3c0-0.55-0.45-1-1-1h-6v-2h2c0.55,0,1-0.45,1-1V7h2c1.1,0,2-0.9,2-2v-0.41C17.92,6.35,20,8.93,20,12C20,14.08,19.2,15.97,17.9,17.39z'
  },
  {
    id: 'challenge',
    name: 'تحدي',
    imageUrl: 'https://images.unsplash.com/photo-1629864228965-0a8a0f6b3e6e?q=80&w=2940&auto=format&fit=crop',
    colorClass: 'bg-[#891811]', // أحمر تحدي
    iconSvgPath: 'M7,2v11h3v9l7-12h-4l4-8H7z'
  },
  {
    id: 'honesty-questions',
    name: 'أسئلة صراحة',
    imageUrl: 'https://images.unsplash.com/photo-1527799820546-d3600f124c6e?q=80&w=2940&auto=format&fit=crop',
    colorClass: 'bg-[#964723]', // برتقالي بني صراحة
    iconSvgPath: 'M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M18,14H6v-2h12V14z M18,11H6V9h12V11z M18,8H6V6h12V8z'
  },
];
