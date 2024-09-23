 export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
  
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInDays > 0) {
      return `${diffInDays} روز پیش`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ساعت پیش`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} دقیقه پیش`;
    } else {
      return `چند لحظه پیش`;
    }
  }
  