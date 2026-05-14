const heroImageEntries = import.meta.glob('../assets/images/HeroSec/*', {
  eager: true,
  as: 'url',
});

const aboutImageEntries = import.meta.glob('../assets/images/About/*', {
  eager: true,
  as: 'url',
});

const projectImageEntries = import.meta.glob('../assets/images/projects/**/*', {
  eager: true,
  as: 'url',
});

export const heroImages = Object.values(heroImageEntries);
export const aboutImages = Object.values(aboutImageEntries);
export const projectImages = projectImageEntries;

const projectGroups = {};
Object.entries(projectImageEntries).forEach(([path, url]) => {
  const parts = path.split('/');
  const projectName = parts[parts.length - 2];
  if (!projectGroups[projectName]) {
    projectGroups[projectName] = { name: projectName, images: [] };
  }
  projectGroups[projectName].images.push(url);
});

export const projectsList = Object.values(projectGroups).sort((a, b) =>
  a.name.localeCompare(b.name)
);

const inferGalleryCategory = (path) => {
  const lower = path.toLowerCase();
  if (lower.includes('pile') || lower.includes('bore') || lower.includes('lab')) {
    return 'Laboratory';
  }
  if (lower.includes('river') || lower.includes('irrigation') || lower.includes('hydro')) {
    return 'Site Work';
  }
  return 'Projects';
};

const galleryItemList = [];

Object.entries(heroImageEntries).forEach(([path, url]) => {
  galleryItemList.push({ src: url, category: 'Site Work', group: 'Hero', path });
});

Object.entries(aboutImageEntries).forEach(([path, url], index) => {
  const category = index % 2 === 0 ? 'Equipment' : 'Laboratory';
  galleryItemList.push({ src: url, category, group: 'About', path });
});

Object.entries(projectImageEntries).forEach(([path, url]) => {
  galleryItemList.push({ src: url, category: inferGalleryCategory(path), group: 'Projects', path });
});

export const galleryItems = galleryItemList;
export const galleryImages = galleryItemList.map((item) => item.src);
