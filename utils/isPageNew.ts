export default function isPageNew(date: Date): boolean {
    const today = new Date();

    // Calculate the difference in milliseconds between the two dates
    const differenceInMs = today.getTime() - new Date(date).getTime();

    // Calculate the difference in days
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    return differenceInDays < (+process.env.NEXT_PUBLIC_DAYS_AS_NEW);
}
