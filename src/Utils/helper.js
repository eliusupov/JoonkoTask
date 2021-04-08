export const downloadURI = uri => {
	const a = document.createElement('a');
	a.download = 'download';
	a.href = uri;
    a.click();
};
