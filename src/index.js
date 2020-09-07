import { registerBlockType } from '@wordpress/blocks';
import { SVG, Path } from '@wordpress/primitives';
import { __ } from '@wordpress/i18n';

const download = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="M18 11.3l-1-1.1-4 4V3h-1.5v11.3L7 10.2l-1 1.1 6.2 5.8 5.8-5.8zm.5 3.7v3.5h-13V15H4v5h16v-5h-1.5z" />
	</SVG>
);
 
registerBlockType( 'custom-download/download-button', {
    title: __('Download Button','custom-download'),
    icon: download,
    category: 'media',
    edit: () => <div>Download, mundo!</div>,
    save: () => <div>Download, mundo!</div>,
} );