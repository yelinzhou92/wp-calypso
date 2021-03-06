/** @format */
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import ReaderMain from 'components/reader-main';
import MobileBackToSidebar from 'components/mobile-back-to-sidebar';
import EmptyContent from 'components/empty-content';
import { recordTrack as recordReaderTrack } from 'reader/stats';
import { bumpStat, recordGoogleEvent } from 'state/analytics/actions';
import { unblockSite } from 'state/reader/site-blocks/actions';

class SiteBlocked extends React.Component {
	static propTypes = {
		siteId: PropTypes.number.isRequired,
	};

	unblockSite = () => {
		this.props.bumpStat( 'reader_actions', 'unblocked_blog' );
		this.props.recordGoogleEvent( 'reader_actions', 'Clicked Unblock Site' );
		recordReaderTrack( 'calypso_reader_unblock_site', {
			blog_id: this.props.siteId,
		} );
		this.props.unblockSite( this.props.siteId );
	};

	render() {
		const { translate, title } = this.props;

		/* eslint-disable wpcalypso/jsx-classname-namespace */
		const action = (
			<button className="empty-content__action button is-primary" onClick={ this.unblockSite }>
				{ this.props.translate( 'Unblock' ) }
			</button>
		);
		/* eslint-enable wpcalypso/jsx-classname-namespace */

		return (
			<ReaderMain>
				<MobileBackToSidebar>
					<h1>{ translate( 'Streams' ) }</h1>
				</MobileBackToSidebar>

				<EmptyContent
					action={ action }
					title={ translate( 'You have blocked this site.' ) }
					line={ translate( "Unblock it if you'd like to see posts from {{em}}%s{{/em}} again.", {
						args: title,
						components: {
							em: <em />,
						},
					} ) }
					illustration={ '/calypso/images/illustrations/illustration-500.svg' }
					illustrationWidth={ 500 }
				/>
			</ReaderMain>
		);
	}
}

export default connect( null, {
	recordGoogleEvent,
	bumpStat,
	unblockSite,
} )( localize( SiteBlocked ) );
