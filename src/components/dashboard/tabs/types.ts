import React from 'react'

export interface TabComponent<T = {}> extends React.FC<T> {
  tabsRole: 'Tab' | 'TabPanel' | 'TabList'
}
