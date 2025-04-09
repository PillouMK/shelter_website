export const getAvatarImage = (avatarId: number): string => {
  const avatarImages = [
    'woman-round-0.png',
    'woman-round-1.png',
    'woman-round-2.png',
    'woman-round-3.png',
    'woman-round-4.png',
    'woman-round-5.png',
    'woman-hand-round.png',
    'woman-protesting-round.png'
  ];

  return avatarImages[avatarId] || avatarImages[0];
}
