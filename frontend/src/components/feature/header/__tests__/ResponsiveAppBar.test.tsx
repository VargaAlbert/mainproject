import { render, screen } from '@testing-library/react';
import ResponsiveAppBar from '../ResponsiveAppBar';
import { PRODUCT_CATEGORY, ALL_PRODUCTS, processString } from '@/utils/category';

describe('ResponsiveAppBar', () => {
    // Check that the logo image is displayed
    it('should render a logo image', () => {
        render(<ResponsiveAppBar />);
        const logoImage = screen.getByAltText('logo');

        expect(logoImage).toBeInTheDocument();
    });

    // The component should render a menu icon button
    it('should render a menu icon button', () => {
        render(<ResponsiveAppBar />);
        const menuIconButton = screen.getByLabelText('account of current user');

        // Check that the menu icon button is displayed
        expect(menuIconButton).toBeInTheDocument();
    });

    // Check that the link contains the correct route
    it('should render a link with the correct route', () => {
        render(<ResponsiveAppBar />);

        const allProductsLink = screen.getByRole('link', { name: new RegExp(ALL_PRODUCTS, 'i') });

        expect(allProductsLink).toBeInTheDocument();
        expect(allProductsLink.getAttribute('href')).toBe(`/products`);


        PRODUCT_CATEGORY.forEach((category) => {
            const categoryLink = screen.getByRole('link', { name: new RegExp(category, 'i') });
            expect(categoryLink).toBeInTheDocument();
            expect(categoryLink.getAttribute('href')).toBe(`/products/${processString(category)}`);
        });

    });
});
