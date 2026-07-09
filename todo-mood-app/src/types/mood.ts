export const MoodOptions = { 
  'HAPPY' : {
    'emoji' : '🤩', 
    'text' : '행복'
  },
  'GOOD' : {
    'emoji' : '😁', 
    'text' : '좋음'
  },
  'NORMAL' : {
    'emoji' : '😐', 
    'text' : '보통'
  },
  'BAD' : {
    'emoji' : '🙁', 
    'text' : '나쁨'
  },
  'SAD' : {
    'emoji' : '😭', 
    'text' : '슬픔'
  },
  'ANGRY' : {
    'emoji' : '🤬', 
    'text' : '화남'
  },
  'TIRED' : {
    'emoji' : '😫', 
    'text' : '피곤'
  },
} as const;

export type MoodKey = keyof typeof MoodOptions;

export interface Mood {
  id : number,
  user_name : string,
  date : string,
  mood : MoodKey,
  memo : string,
  created_at : string
}