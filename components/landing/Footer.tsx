export default function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-gold/10">
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 text-center">
        <span className="font-serif text-xl font-bold text-gold">
          buzBoozt
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-graylight">
          <a href="#" className="hover:text-gold transition">
            Política de privacidad
          </a>
          <a href="#" className="hover:text-gold transition">
            Términos y condiciones
          </a>
          <a href="#" className="hover:text-gold transition">
            Contacto
          </a>
        </nav>

        <p className="text-sm text-graylight">buzboozt@gmail.com</p>

        <p className="text-xs text-graylight">
          © 2026 Buzboozt. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
