import Link from "next/link"

export default function NotFound() {
    return (
        <div className="text-center">
            <p className="mt-10">Sajnálom de nincs ilyen kategoria.</p>
            <Link href="/">Back to Home</Link>
        </div>
    )
}