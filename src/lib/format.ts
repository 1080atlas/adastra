export const weekLabel = (week: number, year: number) =>
  `Week ${String(week).padStart(2, '0')} (${year})`;

export const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Europe/Paris',
    });
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
      timeZoneName: 'short',
    });
  } catch {
    return dateString;
  }
};

export const getStatusBadgeStyle = (status: 'UPCOMING' | 'ACTIVE' | 'CLOSED') => {
  switch (status) {
    case 'UPCOMING':
      return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    case 'ACTIVE':
      return 'bg-green-500/10 text-green-400 border border-green-500/20';
    case 'CLOSED':
      return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
  }
};

export const getWinnerBadgeStyle = (rank: 1 | 2 | 3) => {
  switch (rank) {
    case 1:
      return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
    case 2:
      return 'bg-gray-400/10 text-gray-300 border border-gray-400/20';
    case 3:
      return 'bg-orange-600/10 text-orange-400 border border-orange-600/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
  }
};

export const getWinnerLabel = (rank: 1 | 2 | 3) => {
  switch (rank) {
    case 1:
      return '🥇 1st';
    case 2:
      return '🥈 2nd';
    case 3:
      return '🥉 3rd';
    default:
      return `#${rank}`;
  }
};