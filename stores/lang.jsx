import create from 'zustand'

export const useLangStore = create(set => ({
  lang: "es",
  changeLang: (langCode) => set(state => ({ lang: langCode }))
}))