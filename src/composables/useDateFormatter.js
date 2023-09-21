export default function useDateFormatter (date) {
    return new Date(date).toLocaleDateString('en-US')
}