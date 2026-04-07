# Arsiekeh Pricing Calculator App

A professional, interactive pricing calculator web application built for Arsiekeh AI Agency. This app allows you to share a customized pricing experience with clients through a simple link.

## 🎯 Features

- **Interactive Qualification Flow**: Two-step questionnaire that helps clients find the right package based on their business type and needs
- **Dynamic Recommendations**: Intelligent package recommendations based on client answers
- **5 Service Categories**: Web Design, Events, Social Media, AI Training, and Cybersecurity
- **Currency Switching**: Support for NLE and USD pricing
- **Add-ons & Bundles**: Flexible pricing with optional add-ons and pre-built bundles
- **Lead Capture**: Collect client information for follow-up
- **Quote Generation**: Create downloadable/emailable quotes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 📋 What's Included

### Service Categories

1. **Web Design** (One-time fees)
   - Starter Presence: NLE 1,600
   - Business Launch: NLE 5,000
   - AI-Enhanced: NLE 10,000
   - E-Commerce: NLE 14,000

2. **Event Sites** (One-time fees)
   - The Envelope: NLE 600
   - The Invitation: NLE 900
   - The Celebration: NLE 1,500
   - The Luxury Affair: NLE 2,500

3. **Social Media** (Monthly)
   - Starter Presence: NLE 1,200/mo
   - Growth Package: NLE 2,400/mo
   - Full Presence: NLE 4,000/mo

4. **AI Training** (One-time fees)
   - AI Starter Session: NLE 1,600
   - AI Integration Package: NLE 5,000
   - AI Workflow Transformation: NLE 12,000

5. **Cybersecurity** (One-time fees)
   - Security Essentials: NLE 1,200
   - Business Security Audit: NLE 3,000
   - Advanced Security Package: NLE 8,000

### Pre-built Bundles

- **Startup Essentials**: NLE 6,000 (saves NLE 3,400)
- **Growth Accelerator**: NLE 12,000 (saves NLE 5,200)
- **Premium Transformation**: NLE 25,000 (saves NLE 10,200)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/successor006-png/arsiekeh-pricing-app.git
cd arsiekeh-pricing-app

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
# Build the project
pnpm build

# Preview the production build
pnpm preview

# Start the production server
pnpm start
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── pricing/
│   │   │   ├── PricingCalculator.tsx       # Main component
│   │   │   ├── QualifierScreen.tsx         # Initial qualification flow
│   │   │   ├── BuilderScreen.tsx           # Package selection interface
│   │   │   ├── LeadScreen.tsx              # Client information capture
│   │   │   ├── QuoteScreen.tsx             # Final quote display
│   │   │   └── *.css                       # Component styles
│   │   └── ui/                             # shadcn/ui components
│   ├── lib/
│   │   └── pricingData.ts                  # All pricing data & business logic
│   ├── pages/
│   │   ├── Home.tsx                        # Main page
│   │   └── NotFound.tsx                    # 404 page
│   ├── App.tsx                             # App router & layout
│   ├── main.tsx                            # React entry point
│   └── index.css                           # Global styles
├── public/
│   └── favicon.ico
└── index.html

server/
└── index.ts                                 # Express server (production)

shared/
└── const.ts                                 # Shared constants
```

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient accents
- **Smooth Animations**: Fade-in effects and transitions throughout
- **Responsive Layout**: Adapts beautifully to all screen sizes
- **Color-Coded Badges**: Visual indicators for popular, recommended, and premium packages
- **Real-time Calculations**: Instant pricing updates as selections change
- **Progress Indicators**: Visual feedback during the qualification flow

## 🔧 Customization

### Updating Pricing Data

Edit `client/src/lib/pricingData.ts` to:
- Change package prices
- Add/remove services
- Modify add-ons
- Update bundle configurations
- Change qualification questions

### Branding

Update these files to customize branding:
- `client/index.html` - Page title and meta tags
- `client/src/components/pricing/PricingCalculator.tsx` - Logo and company name
- `client/src/index.css` - Color scheme and typography

### Adding New Features

The component structure makes it easy to extend:
- Add new screens by creating components in `client/src/components/pricing/`
- Extend pricing logic in `client/src/lib/pricingData.ts`
- Modify styling in the respective `.css` files

## 📊 User Flow

1. **Qualification** → Client answers 2 questions about their business
2. **Recommendation** → App suggests the most relevant package
3. **Builder** → Client explores all packages and add-ons
4. **Lead Capture** → Client enters their contact information
5. **Quote** → Client reviews and downloads/emails their quote

## 🌐 Deployment

### Manus Hosting (Recommended)

This project is built with Manus and can be deployed directly:

1. Save a checkpoint: `webdev_save_checkpoint`
2. Click the "Publish" button in the Management UI
3. Get a public URL instantly

### Other Platforms

The project can be deployed to any Node.js hosting:

```bash
# Build for production
pnpm build

# Deploy the dist/ folder
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security

- No backend API calls required for basic functionality
- Client-side calculations only
- Quote download uses HTML5 Blob API
- Email integration uses mailto: protocol

## 📝 License

MIT License - Feel free to use and modify for your business

## 🤝 Support

For questions or issues:
1. Check the code comments in `client/src/lib/pricingData.ts`
2. Review component structure in `client/src/components/pricing/`
3. Refer to the original JSX implementation for logic reference

## 🚀 Next Steps

1. **Customize pricing** to match your current offerings
2. **Update company branding** with your logo and colors
3. **Test the flow** with different qualification answers
4. **Share the link** with clients via email or WhatsApp
5. **Monitor feedback** and iterate on pricing/features

---

Built with React 19 + TypeScript + Tailwind CSS + shadcn/ui
