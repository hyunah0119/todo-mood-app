const MoodType = { 
  'HAPPY' : '🤩', 
  'GOOD' : '😁', 
  'NORMAL' : '😐',
  'BAD' : '🙁',
  'SAD' : '😭', 
  'ANGRY' : '🤬',
  'TIRED' : '😫',
  'SICK' : '🤒',
};

export type MoodType = keyof typeof MoodType;

export interface Mood {
  id : number,
  user_name : string,
  date : string,
  mood : typeof MoodType,
  memo : string,
  created_at : string
}