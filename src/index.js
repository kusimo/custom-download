import { registerBlockType } from '@wordpress/blocks';
import { SVG, Path } from '@wordpress/primitives';
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button, IconButton } from '@wordpress/components'


const download = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="M18 11.3l-1-1.1-4 4V3h-1.5v11.3L7 10.2l-1 1.1 6.2 5.8 5.8-5.8zm.5 3.7v3.5h-13V15H4v5h16v-5h-1.5z" />
	</SVG>
);

const pluginDownloadDir = custom_data.download_file_url;

registerBlockType( 'custom-download/download-button', {
    title: __('Download Button','custom-download'),
    icon: download,
    category: 'media',
    attributes: {
        downloadTitle : {
            type: 'string',
            source: 'text',
            selector: 'button'
        },
        downloadDir: {
            type: 'string',
            source: 'attribute',
            selector: 'form',
            attribute: 'action',
            default: custom_data.download_file_url
        },
        downloadFormat: {
            type: 'string',
            source: 'attribute',
            selector: 'p.up i',
            attribute: 'class',
            default: 'fi fi-file'
        },
        downloadFileSize: {
            type: "string",
            source: "text",
            selector: "p.down",
            default: "File size"
          },
          downloadId: {
            type: 'string',
            source: 'attribute',
            selector: '.custom-download-button-inner',
            attribute: 'id'
        }

    },

    edit: props => {

        // Props parameter holds all the info.
        //console.info(props);

        // Lift info from props and populate various constants.
        const {
            attributes : {downloadTitle, downloadDir, downloadFileSize, downloadId, downloadFormat},
            setAttributes,
            className
        } = props;

        const onChangeTitle = (newTitle) => {
            setAttributes( { downloadTitle: newTitle })
        };

        const onMediaSelect = uploadObject => {
            console.info('Media Info: ', uploadObject);
            setAttributes({ downloadFileSize: uploadObject.filesizeHumanReadable });
            setAttributes({ downloadId: uploadObject.id });
            setAttributes({ downloadDir: pluginDownloadDir+'?aid='+uploadObject.id });

            let fileExt = uploadObject.url.substr(uploadObject.url.lastIndexOf('.') + 1).trim();

            //Check if ext is image
            let imageExtension = ['jpg','jpeg','tiff','png','bmp','gif'];
            let foundExt = imageExtension.includes(fileExt.toLowerCase());

            if(foundExt === true) {
                let downloadExt = 'fi fi-image';
                setAttributes({ downloadFormat: downloadExt });
            } 

            //Check for other files
            let otherExtensions = ['pdf','mp3','mov','zip','txt','doc','xml','mp4','ppt','csv'];
            let foundOthers = otherExtensions.includes(fileExt.toLowerCase());

            if(foundOthers === true) {
                let extIndex = otherExtensions.indexOf(fileExt);
               
                let ext = otherExtensions[`${extIndex}`];

                let downloadExt = 'fi fi-'+ext;

                setAttributes({ downloadFormat: downloadExt });

            }

          }
         

          const handleSubmit = (event) => {
            event.preventDefault();
          }

      

        return (
            <div className= {`${className} button--download`}>
                <div className="custom-download-button-inner" id={downloadId}>
                    <form method="post" onSubmit={handleSubmit} >
                        <button className="g-btn f-l bsbtn d-block position-relative shadow rounded-lg border-0 download-btn-title" type="submit"  title="Download" formtarget="_blank">
                        <RichText 
                            placeholder={__("Download", "custom-download")}
                            onChange= { onChangeTitle}
                            value= {downloadTitle}
                            />
                        </button>
                    
                    <p className="up"><i className={downloadFormat}></i> 
                    <MediaUpload 
                        onSelect={onMediaSelect}
                        value={props.attributes.downloadUrl}
                        render={({ open }) => (
                            <IconButton
                              className="custom-download-logo__button"
                              onClick={open}
                              icon={download}
                              showTooltip="true"
                              label={__("Upload File.", "custom-download")}
                            /> 
                          )}
                    />
                    </p>
                    <p className="down"><i className="fi-folder-o"></i>
                    {downloadFileSize} 
                    </p>
                    </form>
                </div>
            </div>
        )
       
    },
    save: props =>  {
          const {
            attributes: { downloadId, downloadDir, downloadFormat }
          } = props;

        return (
            <div className="button--download">
                 <div className="custom-download-button-inner" id={downloadId}>
                    <form method="post" action={downloadDir}>
                        <button className="g-btn f-l bsbtn d-block position-relative shadow rounded-lg border-0 download-btn-title" type="submit"  title="Download" formtarget="_blank">
                            <RichText.Content value={props.attributes.downloadTitle} />
                        </button>
                    
                    <p className="up"><i className={downloadFormat}></i> 
                    </p>
                    <p className="down"><i className="fi-folder-o"></i>
                    {props.attributes.downloadFileSize}
                    </p>
                    </form>
                </div>
            </div>
        )
    },
} );