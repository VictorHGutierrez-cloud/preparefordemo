const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-16 px-6 md:px-12 lg:px-24 border-t border-primary-foreground/10">
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="font-semibold text-lg mb-2">Factorial</p>
          <p className="text-sm opacity-60 leading-relaxed max-w-sm">Modern HR operations for teams around the world.</p>
        </div>
        <div className="space-y-2 text-sm opacity-80">
          <p className="font-medium opacity-100">Victor Gutierrez</p>
          <p className="opacity-60">Business Development · Factorial</p>
          <p>
            <a href="mailto:victor.gutierrez@factorial.co" className="hover:opacity-100 transition-opacity">
              victor.gutierrez@factorial.co
            </a>
          </p>
          <p>
            <a href="tel:+244950486997" className="hover:opacity-100 transition-opacity">
              +244 950 486 997
            </a>
          </p>
        </div>
      </div>
      <p className="mt-12 text-xs opacity-40 text-center">Proposal prepared for Righteous Foundation — 2026</p>
    </div>
  </footer>
);

export default Footer;
