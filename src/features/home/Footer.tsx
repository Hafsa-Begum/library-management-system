import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <div className="bg-blue-100 shadow-sm inset-shadow-blue-500 text-gray-600 py-4 mt-8">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div className="mx-auto text-xl font-bold">
                    <p>Connect with us via:</p>
                    <p className="flex items-center justify-between my-8 pr-8">
                        <p className="px-2">
                            < Github />
                        </p>
                        <p className="px-2">
                            <Linkedin />
                        </p>
                        <p className="px-2">
                            <Mail />
                        </p>
                    </p>
                    <p>Myself © 2025, Alrights reserved.</p>
                </div>

            </div>
        </div>
    )
}
